<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWineryRequest;
use App\Http\Requests\UpdateWineryRequest;
use App\Http\Resources\WineryResource;
use App\Models\Winery;
use Inertia\Inertia;

class WineryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Winery::query();

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('province')) {
            $query->where('province', 'like', '%' . request('province') . '%');
        }

        // if (request('block')) {
        //     $query->where('block',  request('block'));
        // }

        // Verificar si el valor de 'block' es un booleano
        if (request()->has('block')) {
            $blockValue = filter_var(request('block'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
            if ($blockValue !== null) {
                $query->where('block', $blockValue);
            }
        }

        // $wineries = $query->paginate(10)->onEachSide(1);
        $wineries = $query->paginate(5);

        // return Inertia::render("Winery/Index");
        return inertia("Winery/Index", [
            "wineries" => WineryResource::collection($wineries),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWineryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Winery $winery)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Winery $winery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWineryRequest $request, Winery $winery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Winery $winery)
    {
        //
    }
}
