"user client";

export default function GetDataButton({ handler }: { handler: () => void}) {
  const onButtonClick = () => {
    handler();
  }

  return (
    <button onClick={onButtonClick}>GET Data</button>
  )
}