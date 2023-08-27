<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Song\SongStore;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Song;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::where('player_id', auth()->user()->id)->orderBy('created_at')->with('playlists')->get();
        return $songs;
    }

    public function store(SongStore $request)
    {
        if (!$request->hasFile('song')) return;

        $song = $request->file('song');

        // Getting file name
        $songName = explode('.', $song->getClientOriginalName());
        array_pop($songName);
        $songName = implode('.', $songName);

        // Checking for song existing
        $songExists = Song::where('player_id', auth()->user()->id)->where('name', 'like', $songName)->first();
        if ($songExists) return;

        $fileName = md5(time()) . '.' . $song->extension();

        $path = '/storage/' . Storage::disk('public')->putFileAs('audios', $song, $fileName);
        if ($path) {
            Song::create([
                'name' => $songName,
                'path' => $path,
                'duration' => $request->duration,
                'player_id' => auth()->user()->id
            ]);
        }
    }

    public function destroy(Song $song)
    {
        $playlists = $song->playlists->pluck('id')->toArray();

        $filePath = base_path('public' . $song->path);
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $song->playlists()->detach($playlists);
        $song->delete();
    }

    public function recentListened()
    {
        $songs = Song::latest('updated_at')->where('player_id', auth()->user()->id)->with('playlists')->limit(20)->get();
        return $songs;
    }

    public function popular()
    {
        $songs = Song::where('player_id', auth()->user()->id)->where('listening', '>', '0')->with('playlists')->skip(0)->take(20)->get();
        return $songs;
    }

    public function random()
    {
        $songs = Song::inRandomOrder()->where('player_id', '!=', auth()->user()->id)->limit(30)->get();
        return $songs;
    }

    public function incrementsListening(Request $request)
    {
        $song = Song::find($request->songId);
        $song->listening = $song->listening + 1;
        $song->save();
    }

    public function search(Request $request)
    {
        $songs = Song::where('player_id', auth()->user()->id)->where('name', 'like', '%' . $request->value . '%')->with('playlists')->get();
        return $songs;
    }
}
