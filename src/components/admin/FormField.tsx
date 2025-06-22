interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  asDropdown?: boolean;
  options?: string[];
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 4,
  placeholder,
  asDropdown = false,
  options = [],
}: FormFieldProps) {
  const commonProps = {
    id: name,
    name,
    value,
    onChange,
    required,
    className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
    placeholder,
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {asDropdown ? (
        <select {...commonProps as any}>
          <option value="">Select category</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : multiline ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input {...commonProps} type={type} />
      )}
    </div>
  );
}