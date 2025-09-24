"use client";

import React from 'react';
import { useState } from 'react';
import { postJson } from '@/lib/api';

type RegisterRequest = {
	name: string;
	email: string;
	password: string;
};

type RegisterResponse = {
	message: string;
};

function validateEmail(email: string): boolean {
	return /\S+@\S+\.\S+/.test(email);
}

export default function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!name.trim()) {
			setError('Name is required');
			return;
		}
		if (!email.trim() || !validateEmail(email)) {
			setError('A valid email is required');
			return;
		}
		if (password.length < 8) {
			setError('Password must be at least 8 characters');
			return;
		}

		setIsSubmitting(true);
		try {
			const payload: RegisterRequest = { name: name.trim(), email: email.trim(), password };
			const res = await postJson<RegisterRequest, RegisterResponse>('/auth/register', payload);
			const serverMessage = res?.data?.message || res?.message || 'Registration successful';
			setSuccess(serverMessage);
		} catch (err: unknown) {
			let message = 'Registration failed';
			if (err && typeof err === 'object' && 'message' in err) {
				const m = (err as { message?: string }).message;
				if (m) message = m;
			}
			setError(message);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="nt-component nt-signup flex flex-col items-center justify-center min-h-screen bg-gray-50">
			<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>
				<form className="space-y-4" onSubmit={handleSubmit} noValidate>
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoComplete="name"
							required
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="email"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							required
						/>
						<p className="text-xs text-gray-500 mt-1">Minimum 8 characters.</p>
					</div>
					{error && <div className="text-sm text-red-600">{error}</div>}
					{success && <div className="text-sm text-green-600">{success}</div>}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Signing Up...' : 'Sign Up'}
					</button>
				</form>
				<p className="mt-4 text-xs text-gray-500">By signing up, you agree to our terms.</p>
			</div>
		</div>
	);
}
