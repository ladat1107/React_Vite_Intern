import ImageGrid from "./ImageGrid";

export default function LiveAnyWhere() {
    return (
        <div className="bg-(--color-bg) py-20 px-10 lg:px-32 h-min-screen">
            <div className="bg-white rounded-2xl px-2 py-10">
                <h3 className="text-4xl font-extrabold text-center mb-1.5" >Live AnyWhere</h3>
                <p className="text-gray-400 font-roboto text-center">Keep clam & travel on</p>
                <div className="mt-6 flex flex-wrap justify-center px-2">
                    <ImageGrid />
                    <ImageGrid />
                    <ImageGrid />
                </div>
                <div className="mt-12 border-1 text-center border-gray-300 rounded-3xl w-35 text-gray-500 mx-auto"> Load more</div>

            </div>
        </div>
    )
}