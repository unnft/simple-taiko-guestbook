type Props = {
  title: string;
  statusText?: string;
};

export function BootScreen({ title, statusText }: Props) {
  return (
    <div className="BootScreen">
      <h2>{title}</h2>
      <span>{statusText}</span>
    </div>
  );
}
