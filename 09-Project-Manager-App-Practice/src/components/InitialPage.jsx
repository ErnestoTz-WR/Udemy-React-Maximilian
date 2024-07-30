import imageSrc from '../assets/no-projects.png'
import CreateNewProjectButton from '../components/CreateNewProjectButton'

export default function InitialPage() {
  return (
    <div className="mt-24 text-center w-2/3">
      <img src={imageSrc} className="w-16 h-16 object-contain mx-auto" alt='Note with pen'/>
      <h2 className="text-xl font-bold text-stone-500 my-4">No project selected</h2>
      <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
      <CreateNewProjectButton>Create new project</CreateNewProjectButton>
    </div>
  )
}
