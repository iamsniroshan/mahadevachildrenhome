<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SliderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Sliders/Index', [
            'sliders' => Slider::orderBy('display_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Sliders/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        Slider::create($this->validated($request));

        return redirect()->route('admin.sliders.index')->with('success', 'Slider added.');
    }

    public function edit(Slider $slider): Response
    {
        return Inertia::render('Admin/Sliders/Form', ['slider' => $slider]);
    }

    public function update(Request $request, Slider $slider): RedirectResponse
    {
        $slider->update($this->validated($request));

        return redirect()->route('admin.sliders.index')->with('success', 'Slider updated.');
    }

    public function destroy(Slider $slider): RedirectResponse
    {
        $slider->delete();

        return redirect()->route('admin.sliders.index')->with('success', 'Slider removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'image' => ['required', 'string', 'max:255'],
            'display_order' => ['nullable', 'integer'],
            'status' => ['required', 'in:active,inactive'],
        ]);
    }
}
