'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
DndContext,
PointerSensor,
closestCenter,
useSensor,
useSensors,
type DragEndEvent,
} from '@dnd-kit/core';
import {
SortableContext,
arrayMove,
useSortable,
verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
GripVertical,
Pencil,
Trash2,
Eye,
EyeOff,
Star,
StarOff,
} from 'lucide-react';

import type { Pattern } from '@/types/pattern';
import {
publishPatternAction,
featurePatternAction,
deletePatternAction,
reorderPatternsAction,
} from '@/app/instructor/patterns/actions';

interface Props {
patterns: Pattern[];
}

function SortableRow({ pattern }: { pattern: Pattern }) {
const {
attributes,
listeners,
setNodeRef,
transform,
transition,
} = useSortable({
id: pattern.id,
});

const style = {
transform: CSS.Transform.toString(transform),
transition,
};

const [isPending] = useTransition();

return ( <tr ref={setNodeRef} style={style} className='border-b border-neutral-100'> <td className='px-4 py-4'>
<button
type='button'
{...attributes}
{...listeners}
className='cursor-grab rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 active:cursor-grabbing'
aria-label='Drag to reorder'
> <GripVertical className='h-5 w-5' /> </button> </td>

  <td className='px-4 py-4'>
    <Link
      href={`/instructor/patterns/${pattern.id}/edit`}
      className='flex items-center gap-4'
    >
      {pattern.thumbnail ? (
        <Image
          src={
            pattern.thumbnail.startsWith('http')
              ? pattern.thumbnail
              : `/${pattern.thumbnail}`
          }
          alt={pattern.title}
          width={64}
          height={64}
          className='rounded-xl border border-neutral-200 object-cover'
        />
      ) : (
        <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-[#661093]/10 text-sm font-semibold text-[#661093]'>
          PAT
        </div>
      )}

      <div>
        <h3 className='font-semibold text-neutral-900'>{pattern.title}</h3>
        <p className='text-sm text-neutral-500'>{pattern.slug}</p>
      </div>
    </Link>
  </td>

  <td className='px-4 py-4 text-neutral-700'>{pattern.category}</td>

  <td className='px-4 py-4 text-neutral-700'>{pattern.level}</td>

  <td className='px-4 py-4'>
    {pattern.access === 'premium' ? (
      <span className='rounded-full bg-[#661093]/10 px-3 py-1 text-sm font-medium text-[#661093]'>
        Premium
      </span>
    ) : (
      <span className='rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700'>
        Free
      </span>
    )}
  </td>

  <td className='px-4 py-4'>
    {pattern.published ? (
      <span className='rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700'>
        Published
      </span>
    ) : (
      <span className='rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700'>
        Draft
      </span>
    )}
  </td>

  <td className='px-4 py-4'>
    <div className='flex items-center gap-2'>
      <Link
        href={`/instructor/patterns/${pattern.id}/edit`}
        className='rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[#661093]'
        title='Edit pattern'
      >
        <Pencil className='h-4 w-4' />
      </Link>

      <form
        action={publishPatternAction.bind(
          null,
          pattern.id,
          !pattern.published
        )}
      >
        <button
          type='submit'
          disabled={isPending}
          className='rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[#661093]'
          title={pattern.published ? 'Unpublish pattern' : 'Publish pattern'}
        >
          {pattern.published ? (
            <EyeOff className='h-4 w-4' />
          ) : (
            <Eye className='h-4 w-4' />
          )}
        </button>
      </form>

      <form
        action={featurePatternAction.bind(
          null,
          pattern.id,
          !pattern.featured
        )}
      >
        <button
          type='submit'
          disabled={isPending}
          className='rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 hover:text-[#661093]'
          title={pattern.featured ? 'Remove featured' : 'Feature pattern'}
        >
          {pattern.featured ? (
            <Star className='h-4 w-4 fill-current text-[#D4AF37]' />
          ) : (
            <StarOff className='h-4 w-4' />
          )}
        </button>
      </form>

      <form action={deletePatternAction.bind(null, pattern.id)}>
        <button
          type='submit'
          disabled={isPending}
          onClick={(e) => {
            if (
              !confirm(`Delete "${pattern.title}" permanently?`)
            ) {
              e.preventDefault();
            }
          }}
          className='rounded-lg p-2 text-red-600 hover:bg-red-50'
          title='Delete pattern'
        >
          <Trash2 className='h-4 w-4' />
        </button>
      </form>
    </div>
  </td>
</tr>


);
}

export default function PatternTable({ patterns }: Props) {
const [items, setItems] = useState(patterns);
const [isPending, startTransition] = useTransition();

const sensors = useSensors(
useSensor(PointerSensor, {
activationConstraint: {
distance: 5,
},
})
);

function handleDragEnd(event: DragEndEvent) {
const { active, over } = event;


if (!over || active.id === over.id) return;

const oldIndex = items.findIndex((item) => item.id === active.id);
const newIndex = items.findIndex((item) => item.id === over.id);

const reordered = arrayMove(items, oldIndex, newIndex);

setItems(reordered);

const positions = reordered.map((item, index) => ({
  id: item.id,
  position: index + 1,
}));

startTransition(async () => {
  await reorderPatternsAction(positions);
});


}

return ( <div className='overflow-hidden rounded-3xl border border-neutral-200 bg-white'> <DndContext
     sensors={sensors}
     collisionDetection={closestCenter}
     onDragEnd={handleDragEnd}
   > <table className='w-full text-sm'> <thead className='bg-neutral-50 text-left text-neutral-500'> <tr> <th className='w-16 px-4 py-3'></th> <th className='px-4 py-3'>Pattern</th> <th className='px-4 py-3'>Category</th> <th className='px-4 py-3'>Level</th> <th className='px-4 py-3'>Access</th> <th className='px-4 py-3'>Status</th> <th className='px-4 py-3'>Actions</th> </tr> </thead>


      <tbody>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((pattern) => (
            <SortableRow key={pattern.id} pattern={pattern} />
          ))}
        </SortableContext>
      </tbody>
    </table>
  </DndContext>

  {isPending && (
    <div className='border-t border-neutral-200 bg-neutral-50 px-6 py-3 text-sm text-neutral-500'>
      Saving new pattern order...
    </div>
  )}
</div>

);
}
