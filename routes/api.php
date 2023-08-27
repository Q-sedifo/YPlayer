<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\SongController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('check.token')->group(function() {
    // Songs
    Route::get('/songs', [SongController::class, 'index']);
    Route::get('/songs/recentListened', [SongController::class, 'recentListened']);
    Route::get('/songs/popular', [SongController::class, 'popular']);
    Route::get('/songs/random', [SongController::class, 'random']);
    Route::post('/songs/incrementsListening', [SongController::class, 'incrementsListening']);
    Route::post('/songs/search', [SongController::class, 'search']);
    Route::post('/songs', [SongController::class, 'store']);
    Route::delete('/songs/{song}', [SongController::class, 'destroy']);

    // Playlists
    Route::get('/playlists', [PlaylistController::class, 'index']);
    Route::get('/playlists/{playlist}', [PlaylistController::class, 'show']);
    Route::post('/playlists', [PlaylistController::class, 'store']);
    Route::post('/playlists/toggleSong', [PlaylistController::class, 'songToggle']);
    Route::post('/playlists/removeSong', [PlaylistController::class, 'songRemove']);
    Route::post('/playlists/{playlist}/preview', [PlaylistController::class, 'setPreview']);
    Route::patch('/playlists/{playlist}/rename', [PlaylistController::class, 'rename']);
    Route::delete('/playlists/{playlist}', [PlaylistController::class, 'destroy']);

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
});