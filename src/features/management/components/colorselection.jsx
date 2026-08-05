
export const Color_Selection = ({ color,onChange }) => {
  return (
    <div className="relative w-8 h-8">
      {/* عنصر color input الشفاف لكنه قابل للنقر */}
      <input
        type="color"
        name="colors"
        onChange={onChange }
        value={color}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
      />
      {/* الدائرة التي تظهر اللون */}
      <span
        className="block w-full h-full rounded-full border border-gray-600 pointer-events-none"
        style={{ backgroundColor: color }}
      ></span>
    </div>
  );
};
