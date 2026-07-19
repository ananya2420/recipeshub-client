// import React from 'react';
// import Link from 'next/link'; // 1. Import Link from next/link

// const AdminSidebar = () => {
//   // 2. Add the path for each item
//   const menuItems = [
//     { name: 'Overview', path: '/admin/overview' },
//     { name: 'Manage Users', path: '/admin/users' },
//     { name: 'Manage Recipes', path: '/admin/recipes' },
//     { name: 'Reports', path: '/admin/reports' },
//     { name: 'Transactions', path: '/admin/transactions' },
//   ];

//   return (
//     <div style={{ width: '240px', height: '100vh', borderRight: '1px solid #eee', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', fontWeight: 'bold' }}>
//         <span style={{ marginRight: '10px' }}>🛡️</span>
//         <h3>Admin Panel</h3>
//       </div>

//       <nav>
//         {menuItems.map((item, index) => (
//           // 3. Wrap each item in the Link component
//           <Link 
//             key={index} 
//             href={item.path} 
//             style={{ 
//               display: 'block', // Ensures the Link takes up the full width/height of the padding area
//               padding: '15px 0', 
//               cursor: 'pointer',
//               color: '#333',
//               textDecoration: 'none' // Removes the default underline
//             }}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;

import React from 'react';

const AdminDashboardPage = () => {
    return (
        <div>
            
        </div>
    );
};

export default AdminDashboardPage;