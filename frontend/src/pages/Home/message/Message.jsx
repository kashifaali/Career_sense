import React from 'react';

const messages = [
  {
    id: 1,
    user: {
      name: 'Alice Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    },
    lastMessage: 'Hey, are you available',
    time: '2h ago',
  },
  {
    id: 2,
    user: {
      name: 'Bob Martin',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    },
    lastMessage: 'Thanks for sharing ',
    time: 'Yesterday',
  },
  {
    id: 3,
    user: {
      name: 'Catherine Lee',
      avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    },
    lastMessage: 'Let’s catch up ☕',
    time: '3d ago',
  },
];

export default function Message() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Messages</h2>
      <ul className="space-y-4">
        {messages.map(({ id, user, lastMessage, time }) => (
          <li key={id} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <span className="text-xs text-gray-500">{time}</span>
              </div>
              <p className="text-sm text-gray-700 truncate">{lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
