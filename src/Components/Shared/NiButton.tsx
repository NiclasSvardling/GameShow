
interface NiButtonProps {

    Text: string;
    onClick: () => void;
    disable?: boolean;
   
}


export const NiButton: React.FC<NiButtonProps> = ({ Text, onClick, disable  }) => {

    return <button disabled={disable } className="bg-yellow-600 hover:bg-yellow-700 py-3 px-8 rounded-lg text-yellow-100 border-b-4 border-yellow-700 hover:border-yellow-800 transition duration-300" onClick={() => onClick()}>{Text} </button>
}