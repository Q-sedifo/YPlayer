<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Playlist;
use App\Models\Song;
use App\Http\Requests\Playlist\PlaylistStore;
use App\Http\Requests\Playlist\PlaylistRename;
use App\Http\Requests\Playlist\PlaylistPreview;

class PlaylistController extends Controller
{
    public function index()
    {
        $playLists = Playlist::where('player_id', auth()->user()->id)->orderBy('created_at')->withCount('songs')->get();
        return $playLists;
    }

    public function show($playlist)
    {
        $playlist = Playlist::where('player_id', auth()->user()->id)->where('id', $playlist)->with('songs')->first();
        return $playlist;
    }

    public function store(PlaylistStore $request) 
    {   
        $data = $request->validated();
        $data['player_id'] = auth()->user()->id;
        $data['preview'] = 'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2023/04/brandon-erlinger-ford-zwommz8s-qu-unsplash.jpg';
    
        $playlist = Playlist::create($data);
        return $playlist;
    }

    public function rename(Playlist $playlist, PlaylistRename $request)
    {
        $request->validated();

        $playlist->name = $request->name;
        $playlist->save();
    }

    public function destroy(Playlist $playlist)
    {
        $songs = $playlist->songs->pluck('id')->toArray();

        // Deleting playlist preview
        $previewPath = base_path('public' . $playlist->preview);
        if (file_exists($previewPath)) {
            unlink($previewPath);
        } 
        
        $playlist->songs()->detach($songs);
        $playlist->delete();
        return;
    }   

    public function songRemove(Request $request) 
    {
        $playlist = PlayList::find($request->playlistId);
        $song = Song::find($request->songId);

        $playlist->songs()->detach($song->id);
    }

    public function setPreview(Playlist $playlist, PlaylistPreview $request)
    {
        $request->validated();

        if (!$request->hasFile('preview')) {
            return;
        }

        $preview = $request->file('preview');
        $fileName = md5(time()) . '.' . $preview->extension();

        $previousPreview = base_path('public' . $playlist->preview);

        // Deleting previous playlist preview
        if (file_exists($previousPreview)) {
            unlink($previousPreview);
        } 

        // $path = '/public/storage/' . Storage::disk('public')->putFileAs('images', $preview, $fileName);
        $path = '/storage/' . Storage::disk('public')->putFileAs('images', $preview, $fileName);

        if ($path) {
            $playlist->preview = $path;
            $playlist->save();
        }
    }

    // Action for set or delete relation with playlist and song
    public function songToggle(Request $request)
    {
        $playlist = PlayList::find($request->playlistId);
        $song = Song::find($request->songId);

        $exists = $playlist->songs->contains($song);

        if ($exists) {
            $playlist->songs()->detach($song->id);
            return;
        }

        $playlist->songs()->attach($song);
    }
}
