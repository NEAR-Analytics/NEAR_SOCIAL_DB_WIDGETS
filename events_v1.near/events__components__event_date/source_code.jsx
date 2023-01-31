const event = props.event;
if (!event) {
  return '';
}

const startDate = new Date(event.start_date);
const endDate = new Date(event.end_date);
const datesAreEqual = startDate.toDateString() === endDate.toDateString();
const endDateIsNull =
  endDate === null || endDate.toDateString() === new Date(0).toDateString();

return datesAreEqual ? (
  <>
    {startDate.getDate()}{' '}
    {startDate.toLocaleString('default', { month: 'short' })}{' '}
    {startDate.getFullYear()}
  </>
) : (
  <>
    {startDate.getDate()}{' '}
    {startDate.toLocaleString('default', { month: 'short' })}{' '}
    {startDate.getFullYear()}
    {endDateIsNull ? (
      <> - ongoing</>
    ) : (
      <>
        - {endDate.getDate()}{' '}
        {endDate.toLocaleString('default', { month: 'short' })}{' '}
        {endDate.getFullYear()}
      </>
    )}
  </>
);
