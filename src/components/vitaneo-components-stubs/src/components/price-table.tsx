export default function PriceTable() {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left">Formule</th>
            <th className="px-3 py-2 text-right">Prix / mois</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-3 py-2">Séjour standard</td>
            <td className="px-3 py-2 text-right">1 290 €</td>
          </tr>
          <tr className="border-t">
            <td className="px-3 py-2">Séjour + assistance</td>
            <td className="px-3 py-2 text-right">1 590 €</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
