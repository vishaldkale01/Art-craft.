import { useEffect } from 'react';
import { useMessages } from '../../hooks/useMessages';
import { Trash2 } from 'lucide-react';

export default function AdminMessages() {
  const { messages, fetchMessages, deleteMessage } = useMessages();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{msg.name}</td>
                  <td className="px-4 py-2">{msg.email}</td>
                  <td className="px-4 py-2 max-w-xs break-words">{msg.message}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{new Date(msg.date).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
