type Props = {
  id: string;
  errors?: string | string[] | null;
};

export default function FormErrorMassage({ errors, id }: Props) {
  if (!errors?.length) return null;

  if (typeof errors === "string") {
    return (
      <div id={id} aria-live="polite" aria-atomic="true">
        <p className="mt-2 text-sm text-red-500">{errors}</p>
      </div>
    );
  }

  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors.map((error) => (
        <p className="mt-2 text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}
