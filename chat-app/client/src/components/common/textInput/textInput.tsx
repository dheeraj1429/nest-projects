import { Props } from '.';

export default function TextInput({ lable, id, type, placeHolder, onChange, value }: Props) {
   return (
      <div>
         <label className="block text-gray-700 text-sm font-bold mb-2">
            <i className="fas fa-envelope mr-2"></i>
            {lable}
         </label>
         <div>
            <input
               onChange={onChange}
               value={value}
               id={id}
               type={type}
               className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               placeholder={placeHolder}
            />
         </div>
      </div>
   );
}
