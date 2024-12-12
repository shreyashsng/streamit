import React from "react";

export default function CenteredText() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-xl text-gray-900">
      Hello, I'm Shreyash!
    </div>
  );
}
import { Link } from 'next-view-transitions';

export function AnimatedName() {
  return (
    <Link href="/" className="flex mb-8 font-medium text-gray-400 fade-in">
      Shreyash Singh
    </Link>
  );
}