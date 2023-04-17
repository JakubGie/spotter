const Time = ({time}) => {
    const date = time.slice(0, 10)
    return (
        <>{date}</>
    )
}

export default Time