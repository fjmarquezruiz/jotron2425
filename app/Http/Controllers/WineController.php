<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWineRequest;
use App\Http\Requests\UpdateWineRequest;
use App\Http\Resources\WineResource;
use App\Models\Wine;
use Inertia\Inertia;

class WineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Wine::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'asc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        $wines = $query->orderBy($sortField, $sortDirection)->paginate(10);

        // return Inertia::render("Wine/Index");
        return inertia("Wine/Index", [
            "wines" => WineResource::collection($wines),
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
    public function store(StoreWineRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Wine $wine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wine $wine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWineRequest $request, Wine $wine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wine $wine)
    {
        //
    }
}
