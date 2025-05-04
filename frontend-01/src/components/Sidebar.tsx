import React, { useState } from "react";

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for desktop */}
            <div className="w-64 bg-white shadow-lg hidden md:block">
                <div className="p-4 font-bold text-xl border-b">My Sidebar</div>
                <nav className="p-4 space-y-2">
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">Tweets</a>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">Document</a>
                    <a href="#" className="block p-2 rounded hover:bg-gray-200">Videos</a>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Toggle Sidebar
                </button>
                <h1 className="text-2xl font-s    const [isSidebarOpen, setIsSidebarOpen] = useState(false);emibold">Main Content Area</h1>
            </div>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 md:hidden">
                    <div className="p-4 font-bold text-xl border-b flex justify-between items-center">
                        My Sidebar
                        <button onClick={() => setIsSidebarOpen(false)}>&times;</button>
                    </div>
                    <nav className="p-4 space-y-2">
                        <a href="#" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
                        <a href="#" className="block p-2 rounded hover:bg-gray-200">Profile</a>
                        <a href="#" className="block p-2 rounded hover:bg-gray-200">Settings</a>
                        <a href="#" className="block p-2 rounded hover:bg-gray-200">Logout</a>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Sidebar