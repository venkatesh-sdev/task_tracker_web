const Header = () => {
    return (
        <header className="flex items-center justify-between 2xl:px-24 md:px-10 px-5 md:py-5 py-2">
            {/* Logo */}
            <h1 className="md:text-3xl text-xl font-bold ">Task Board</h1>
            {/* Profile */}
            <div className="md:w-[70px] md:h-[70px] w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center">
                <span className="md:text-2xl text-lg font-bold">V</span>
            </div>
        </header>
    )
}

export default Header