'use client';

import { useEffect, useState } from 'react';

export default function Home() {
	const calculateTimeLeft = () => {
		const targetDate = new Date('2025-05-15T00:00:00');
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		let timeLeft = {
			days: 0,
			hours: 0,
			minutes: 0,
		};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearInterval(timer);
	}, []);
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0a0a2a] to-[#1a1a40] text-white relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
			<div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700 rounded-full opacity-20 blur-3xl -translate-x-1/3 translate-y-1/3"></div>
			<div className="absolute top-0 right-0 w-72 h-72 bg-purple-700 rounded-full opacity-20 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
			<div className="absolute bottom-0 right-0 w-72 h-72 bg-red-600 rounded-full opacity-20 blur-3xl translate-x-1/2 translate-y-1/3"></div>

			{/* Main Content */}
			<div className="z-10 text-center">
				<h1 className="text-6xl md:text-8xl font-extrabold mb-4">YumeUI</h1>
				<p className="text-2xl md:text-4xl font-medium text-gray-300 mb-10">
					Coming Soon
				</p>
				<div className="flex items-center justify-center gap-6 text-center mb-10">
					{['days', 'hours', 'minutes'].map((unit) => (
						<div key={unit} className="flex items-center gap-4">
							<div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 max-sm:px-4 max-sm:py-[10px]">
								<p className="text-3xl font-semibold">
									{timeLeft[unit as keyof typeof timeLeft]}{' '}
								</p>
								<p className="text-xs text-gray-300 mt-1">
									{unit.toUpperCase()}
								</p>
							</div>
							{unit !== 'minutes' && (
								<div className="text-4xl font-semibold">:</div>
							)}
						</div>
					))}
				</div>

				<p className="text-sm mb-2">
					If you have any questions, please contact us at:
				</p>
				<a href="mailto:contact@yumeui.com" className="text-blue-400 underline">
					contact@yumeui.com
				</a>

				<div className="flex justify-center gap-4 mt-6 text-white">
					<a href="#" className="hover:text-blue-400">
						<i className="fab fa-twitter" />
					</a>
					<a href="#" className="hover:text-blue-400">
						<i className="fab fa-telegram" />
					</a>
					<a href="#" className="hover:text-blue-400">
						<i className="fab fa-instagram" />
					</a>
				</div>

				<p className="text-xs text-gray-500 mt-6">
					© {new Date().getFullYear()} YumeUI, All rights reserved.
				</p>
			</div>
		</main>
	);
}
