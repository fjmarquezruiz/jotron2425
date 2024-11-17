<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            // Get birthdate data
            'birthdate_select.day' => 'required|integer|between:1,31',
            'birthdate_select.month' => 'required|integer|between:1,12',
            'birthdate_select.year' => 'required|integer|min:1900|max:' . (date('Y') - 18), // Ensure the year is at least 18 years ago
        ]);

        // Extract the birthday from the request
        $day = $request->birthdate_select['day'];
        $month = $request->birthdate_select['month'];
        $year = $request->birthdate_select['year'];

        // Check if the user is at least 18 years old
        $birthDate = Carbon::createFromDate($year, $month, $day);
        if ($birthDate->diffInYears(now()) < 18) {
            return redirect()->back()->withErrors(['birthdate_select' => 'You must be at least 18 years old.'])->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birth_date' => $birthDate, // Store the birthday as a single date
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
