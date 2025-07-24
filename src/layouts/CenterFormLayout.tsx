import type React from "react"

interface IAuthFormPageProps {
    children: React.ReactNode,
}

const CenterFormLayout: React.FC<IAuthFormPageProps> = ({ children }) => {

    return (
        <div className="flex justify-center items-center">
            <div className="border-1 border-solid border-gray-300 p-2 m-4  w-[350px]">
                {children}
            </div>
        </div>
    )
}

export default CenterFormLayout