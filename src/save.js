import { useBlockProps, RichText} from '@wordpress/block-editor';
import classNames from 'classnames';

export default function save({attributes}) {

	const {heading,description,url,alt,alignment,leftImage, roundedCorner}= attributes;

	const classes= classNames({
		"reverse":!leftImage,
		"rounded-corner":roundedCorner

	})

	return (
		<>
			<div { ...useBlockProps.save({
				className:classes
			}) }>
				<div className={`image-content`}>
					{url ?<img src={url} alt={alt} />: <div className='placeholder'> placeholder image</div>}
				</div>
				<div className={`content align-${alignment}`}> 
					<RichText.Content tagName='h1' value={heading} />
					<RichText.Content tagName='p' value={description}/>
				</div> 
			</div>
		</>
	);
}
