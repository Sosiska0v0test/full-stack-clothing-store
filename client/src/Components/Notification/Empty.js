import moment from "moment";
import { MdOutlineTravelExplore } from "react-icons/md";

export const Empty = ({ message }) => {
  return (
    <div className="flex-colo w-full py-12 px-4 rounded bg-dry gap-4">
      <div className='flex-colo w-24 h-24 p-5 rounded-full bg-dry text-subMain text-4xl'>
        <MdOutlineTravelExplore />
      </div>
      <p className='text-mainText text-sm text-white'>{ message }</p>
    </div>
  )
}

export const ShortUpercaseId = (id) => {
  return id.slice(0, 8).toUpperCase();
}

export const DateFormat = (date) => {
  return moment(date).format("LL");
}