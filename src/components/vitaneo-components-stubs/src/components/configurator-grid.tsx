export default function ConfiguratorGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border rounded p-4">
      <div className="h-16 rounded bg-gray-100 flex items-center justify-center">Activité A</div>
      <div className="h-16 rounded bg-gray-100 flex items-center justify-center">Activité B</div>
      <div className="h-16 rounded bg-gray-100 flex items-center justify-center">Activité C</div>
    </div>
  );
}
