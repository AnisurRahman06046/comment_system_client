const CommentsPage = () => {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Comments!
          </h2>
          <p className="text-gray-600 mb-4">
            You are now logged in and viewing the protected comments page.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              ✅ Authentication is working correctly!
              <br />
              ✅ Protected route is working!
              <br />
              ✅ Layout with header is working!
            </p>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Comment features coming in the next phases...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
