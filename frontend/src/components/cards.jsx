

export function Card({ title, children }) {
  return (
    <div className="border p-6 rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
