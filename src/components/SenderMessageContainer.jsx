const SenderMessageContainer = ({ nom, contenue }) => {
    return (
      
            <div className=' w-full flex justify-end items-end  '>
            <div className='rounded-t-xl p-2 rounded-bl-xl shadow-sm  text-white max-w-[80vw] bg-primary-color/90  '>
                <h1 className='text-gray-white underline'>{nom}</h1>
                <p className=''>
                    {contenue}
                </p>
            </div>
        </div>
    
    );
}

export default SenderMessageContainer;