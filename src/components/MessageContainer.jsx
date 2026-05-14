const MessageContainer = ({children}) => {
    return (
        <section className='flex flex-col px-2 gap-4 overflow-auto flex-1 bg-gray-100 py-5 '>
            {children}
        </section>
    );
}

export default MessageContainer;