
import { TranslateSongGameBox } from "../Shared/TranslateSongGameBox";

export const TranslateSongQuiz: React.FC = () => {



    return <>
        <div className='flex justify-center'>
            <div className='flex text-white flex-col items-center gap-8'>
                <div className='text-5xl'>Oops google scrambled me songs!</div>
                <TranslateSongGameBox controller={false}></TranslateSongGameBox>
            </div>  
        </div>
    </>
}
