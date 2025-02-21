
export default function ImageGrid() {
    return (
        <div data-testid="image" className="text-center flex flex-col items-center p-2 w-full lg:w-1/3">
            <img className="peer hover:scale-90 hover:cursor-pointer transition-transform duration-300 text-center rounded-lg w-72 h-[400px]" src="https://inkythuatso.com/uploads/thumbnails/800/2022/07/16-tranh-phong-canh-anime-inkythuatso-20-10-56-44.jpg" alt="" />
            <div className="peer-hover:scale-120 duration-300  mt-4 font-bold text-sm ">Title image</div>
            <div className="text-gray-400 text-xs">3.145 views</div>
        </div>
    )
}