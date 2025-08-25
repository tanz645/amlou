import { useState } from 'react';
import ImageUploader from './elements/ImageUploader';

interface ServiceFormValues {
  id?: string;
  name: string;
  shortDescription?: string;
  serviceMaster?: string;
  description?: string;
  image?: string;
  features?: string;
  unit_price?: number;
  max_discount?: number;
  minimum_time_required?: number;
  minimum_order_unit?: number;
}

interface FormServicesProps {
  initialValues?: ServiceFormValues;
  onSubmit: (values: ServiceFormValues) => void;
  submitLabel?: string;
}

export default function FormServices({ initialValues, onSubmit, submitLabel = 'Save Service' }: FormServicesProps) {
  const [form, setForm] = useState<ServiceFormValues>({
    name: '',
    shortDescription: '',
    serviceMaster: '',
    description: '',
    image: '',
    features: '',
    unit_price: undefined,
    max_discount: undefined,
    minimum_time_required: undefined,
    minimum_order_unit: undefined,
    ...initialValues,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value ? Number(value) : undefined }));
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(form);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <input
          type="text"
          name="shortDescription"
          value={form.shortDescription}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Master</label>
        <input
          type="text"
          name="serviceMaster"
          value={form.serviceMaster}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
        <ImageUploader
          name="image"
          value={form.image}
          onChange={handleImageChange}
          label="Upload Service Image"
          previewClassName="h-32 w-32 mx-auto"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
        <input
          type="text"
          name="features"
          value={form.features}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($)</label>
          <input
            type="number"
            name="unit_price"
            value={form.unit_price ?? ''}
            onChange={handleNumberChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount ($)</label>
          <input
            type="number"
            name="max_discount"
            value={form.max_discount ?? ''}
            onChange={handleNumberChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Time Required (days)</label>
          <input
            type="number"
            name="minimum_time_required"
            value={form.minimum_time_required ?? ''}
            onChange={handleNumberChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Unit</label>
          <input
            type="number"
            name="minimum_order_unit"
            value={form.minimum_order_unit ?? ''}
            onChange={handleNumberChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        disabled={submitting}
      >
        {submitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
} 