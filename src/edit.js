import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({attributes,setAttributes}) {

	const {heading,description,alignment}= attributes;

	const changeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const changeDescription = (newDescription) => {
		setAttributes({ description: newDescription });
	};

	return (
		<>
			<div { ...useBlockProps() }>
				<div> 
					<RichText tagName='h1' value={heading} onChange={changeHeading} placeholder={__("Title of the block","imageandtext")} />
					<RichText tagName='p' value={description} onChange={changeDescription} placeholder={__("Description of the block","imageandtext")}/>
				</div>
			</div>
		</>

	);
}
