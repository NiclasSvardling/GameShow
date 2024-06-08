interface DropdownProps {
  options: optionProps[]
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export interface optionProps {
  id: string
  value: string
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  return (
    <>
      <select onChange={onChange} className='min-w-20'>
        {options.map((opt, index) => (
          <option key={index}>{opt.value}</option>
        ))}
      </select>
    </>
  )
}
