// import useLocalStorage from '../../Hooks/localStorageHook'
// import { TranslateSongModel } from '../../Model/TranslateSongModel'
// import { NiButton } from '../Shared/NiButton'
// import { TranslateSongGameBox } from '../Shared/TranslateSongGameBox'

// interface TranslateSongControllerProps {}

// export const TranslateSongController: React.FC<TranslateSongControllerProps> = ({ controller }) => {
//   const [translateSong, setTranslateSong] = useLocalStorage<TranslateSongModel | undefined>(
//     'TranslateSong',
//     undefined,
//   )

//   if (translateSong)
//     return (
//       <div className='self-center'>
//         <TranslateSongGameBox controller={true}></TranslateSongGameBox>
//         <div className='mt-4'>
//           <div className='flex justify-between'>
//             <NiButton
//               Text='<'
//               onClick={() => {
//                 if (translateSong.id && dataTranslateSong.data && translateSong.id > 1) {
//                   const newTran = dataTranslateSong.data?.find(
//                     t => t.id === (translateSong.id ?? 0) - 1,
//                   )

//                   if (newTran) setTranslateSong(new TranslateSongModel(newTran))
//                 }
//               }}></NiButton>

//             <NiButton
//               Text='Reveal title'
//               onClick={() => {
//                 setTranslateSong({
//                   ...translateSong,
//                   revealTitle: !translateSong.revealTitle,
//                 })
//               }}></NiButton>

//             <NiButton
//               Text='>'
//               onClick={() => {
//                 if (
//                   translateSong.id &&
//                   dataTranslateSong.data &&
//                   dataTranslateSong.data?.length > translateSong.id
//                 ) {
//                   const newTran = dataTranslateSong.data?.find(
//                     t => t.id === (translateSong.id ?? 0) + 1,
//                   )

//                   if (newTran) setTranslateSong(new TranslateSongModel(newTran))
//                 }
//               }}></NiButton>
//           </div>
//         </div>
//       </div>
//     )
// }
