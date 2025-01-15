import S from "./developer.module.css"

export default function Developer({page}) {

    return (
        <>
            <div className={page === 3 ? S.developersPage : S.hideDevpage}>

            </div>
        </>
    )
}