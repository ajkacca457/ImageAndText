import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText,MediaPlaceholder, BlockControls,AlignmentToolbar } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({attributes,setAttributes}) {

	const {heading,description,alignment}= attributes;

	const changeHeading = (newHeading) => {
		setAttributes({ heading: newHeading });
	};

	const changeDescription = (newDescription) => {
		setAttributes({ description: newDescription });
	};

	const changeAlignment=(newAlignment)=>{
		setAttributes({alignment:newAlignment})
	}

	return (
		<>

			<BlockControls>
				<AlignmentToolbar value={alignment} onChange={changeAlignment}></AlignmentToolbar>
			</BlockControls>

			<div { ...useBlockProps({
				className:"flex-parent"
			}) }>
				<div className='image-content'>
					<MediaPlaceholder></MediaPlaceholder>
				</div>
				<div className={`content align-${alignment}`}> 
					<RichText tagName='h1' value={heading} onChange={changeHeading} placeholder={__("Title of the block","imageandtext")} />
					<RichText tagName='p' value={description} onChange={changeDescription} placeholder={__("Description of the block","imageandtext")}/>
				</div>
			</div>
		</>

	);
}
