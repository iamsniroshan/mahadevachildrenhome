<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => Contact::latest()->get(),
        ]);
    }

    public function update(Request $request, Contact $contact): RedirectResponse
    {
        $contact->update($request->validate([
            'status' => ['required', 'in:new,read,responded,closed'],
        ]));

        return redirect()->route('admin.contacts.index')->with('success', 'Contact updated.');
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->route('admin.contacts.index')->with('success', 'Contact removed.');
    }
}
