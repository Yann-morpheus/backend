const ReceiverMessageContainer = ({ nom, contenue }) => {
    return (
        <div className='rounded-t-xl p-2 rounded-br-xl shadow-xs border border-gray-100 text-black w-fit max-w-[80vw]  bg-white  '>
            <h1 className='text-primary-color underline'>{nom}</h1>
            <p className=''>
                {contenue}
            </p>

        </div >
    );
}

export default ReceiverMessageContainer;