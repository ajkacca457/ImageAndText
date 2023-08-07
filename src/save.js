import { useBlockProps, RichText} from '@wordpress/block-editor';

export default function save({attributes}) {

	const {heading,description,url,alt,alignment}= attributes;

	return (
		<>
			<div { ...useBlockProps.save({
				className:"flex-parent"
			}) }>
				<div className={`image-content`}>
					{url && <img src={url} alt={alt} />}
				</div>
				<div className={`content align-${alignment}`}> 
					<RichText.Content tagName='h1' value={heading} />
					<RichText.Content tagName='p' value={description}/>
				</div> 
			</div>
		</>
	);
}
