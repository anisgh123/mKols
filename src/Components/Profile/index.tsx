import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <main className="w-full max-w-3xl bg-white shadow-md rounded-lg mt-10 p-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <form className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Personal info</h2>
            <p className="text-sm text-gray-600">Update your photo and personal details here.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="first-name" name="first-name" defaultValue="Oliva" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div className="col-span-1">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">&nbsp;</label>
              <input type="text" id="last-name" name="last-name" defaultValue="Rhye" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" id="email" name="email" defaultValue="olivia@untitledui.com" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your photo</label>
            <div className="mt-1 flex items-center">
              <img src="profile.jpg" alt="Profile" className="inline-block h-12 w-12 rounded-full" />
              <input type="file" id="photo" name="photo" accept="image/*" className="ml-4" />
            </div>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <select id="country" name="country" defaultValue="United States" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="United States">United States</option>
              {/* Add other country options here */}
            </select>
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <div className="mt-1">
              <textarea id="bio" name="bio" rows={4} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.
              </textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">275 characters left</p>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">Save</button>
        </form>
      </main>
    </div>
  );
};

export default Profile;
