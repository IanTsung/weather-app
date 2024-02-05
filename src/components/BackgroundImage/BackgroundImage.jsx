const BackgroundImage = ({imageUrl, alt="Background Image", className, children}) => {
    return (
        <div className={className} style={{ backgroundImage: `url(${imageUrl})`}}>         
            <img src={imageUrl} alt={alt} className="hidden"/>
            {children}
        </div>
    )
}

export default BackgroundImage;