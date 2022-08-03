import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, LegacyRef, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const captionRef = useRef<LegacyRef<HTMLInputElement> | null>(null);
  const filePickerRef = useRef<LegacyRef<HTMLInputElement> | null>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };

  const uploadPost = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    //Create a post and add to firestore => 'posts' collection
    //get the post ID for the newly created post
    //upload the image to firebase storage with post id
    //get a download url from firebase storage and update the original post
    // with image.

    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.username,
      caption: captionRef.current.value,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile!, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        onClose={setOpen}
        className='z-10 inset-0 overflow-y-auto 
        fixed'>
        <div
          className='flex items-end justify-center 
        min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20
        text-center sm:block sm:p-10
        '>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay
              className='fixed inset-0 bg-gray-500 bg-opacity-75 
            transition-opacity'
            />
          </Transition.Child>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'>
            &#8203:
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div
              className='inline-block align-bottom bg-white rounded-lg 
            px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
            transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
            '>
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt='Selected file'
                    className='w-full object-contain cursor-pointer'
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <div
                    onClick={(e) => filePickerRef.current.click()}
                    className='mx-auto flex items-center justify-center h-12
                  w-12 rounded-full bg-red-100 cursor-pointer
                  '>
                    <CameraIcon
                      aria-hidden='true'
                      className='h-6 w-6 text-red-600'
                    />
                  </div>
                )}

                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'>
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        type='file'
                        ref={filePickerRef}
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>

                    <div className='mt-2'>
                      <input
                        ref={captionRef}
                        type='text'
                        placeholder='Please enter a caption...'
                        className='border-none focus:ring-0 w-full text-center'
                      />
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={!selectedFile}
                    onClick={uploadPost}
                    className='inline-flex justify-center w-full rounded-md border
                  border-transparent shadow-sm px-4 py-2 bg-red-600 text-base
                  font-medium text-white hover:bg-red-700 focus:outline-none
                  focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  hover:disabled:bg-gray-300
                  
                  '>
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
