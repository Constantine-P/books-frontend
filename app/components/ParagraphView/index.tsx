import styles from 'app/components/ParagraphView/style.module.scss';
import parse, { domToReact } from 'html-react-parser';
import { Image } from 'primereact/image';
import { Skeleton } from 'primereact/skeleton';
import * as R from 'ramda';
import React, { createElement, useMemo, useRef } from 'react';

import { LinkList } from '@/components/LinkList';
import { SelfScrollingWrapper } from '@/components/SelfScrollingWrapper';
import { hashCode } from '@/helpers/hashCode';
import { slugify } from '@/helpers/slugify';
import { useElementsInView } from '@/helpers/useElementsInView';
import { useStore } from '@/store/useStore';

import type { DOMNode } from 'html-dom-parser';

export function ParagraphView() {
  const { state } = useStore();
  const viewRef = useRef<HTMLDivElement>(null);
  const [elementsRef, isNotesVisibleRecord] = useElementsInView<HTMLDivElement, HTMLDivElement>(
    viewRef.current,
    {
      root: viewRef.current,
      rootMargin: '0px',
      threshold: 1,
    }
  );

  const notes = useMemo(
    () => (
      <>
        {Object.entries(isNotesVisibleRecord)
          .filter(([, value]) => !!value)
          .map(([key], index) => (
            <div key={key}>
              [{index + 1}]: {elementsRef.current?.[key]?.dataset.note?.slice(1, -1)}
            </div>
          ))}
      </>
    ),
    [elementsRef, isNotesVisibleRecord]
  );

  const isNotesVisible = !!Object.values(isNotesVisibleRecord).filter(Boolean).length;

  const options = useMemo(
    () => ({
      replace(node: DOMNode) {
        if (!('name' in node && 'children' in node)) {
          return node;
        }

        const children = domToReact(node.children as DOMNode[], options);

        if (node.name === 'img') {
          return (
            <div>
              <Image className={styles.image} {...node.attribs} preview />
              <div className={styles.imageLabel}>{node.attribs.alt}</div>
            </div>
          );
        }

        if (node.name === 'h1') {
          return <h1 className={styles.heading}>{children}</h1>;
        }

        if (node.name === 'h2' || node.name === 'h3') {
          const textNode = node.children[0];
          if (textNode.type !== 'text') return node;
          const id = slugify(textNode.data);
          return (
            <SelfScrollingWrapper>
              {createElement(
                node.name,
                { className: styles.heading, id },
                <a href={`#${id}`}>{children}</a>
              )}
            </SelfScrollingWrapper>
          );
        }

        if (node.name === 'pre') {
          return domToReact(node.children as DOMNode[], options);
        }

        if (node.name === 'code') {
          return <div className={styles.code}>{children}</div>;
        }

        if (node.name === 'p') {
          return <div className={styles.paragraph}>{children}</div>;
        }

        if (node.name === 'blockquote') {
          return <div className={styles.formula}>{domToReact(node.children as DOMNode[])}</div>;
        }

        if (node.name === 'note') {
          const child = node.children[0];
          if (!('data' in child)) return node;
          const keys = Object.keys(elementsRef.current ?? {});
          const key = hashCode(child.data);
          const index = keys.indexOf(`${key}`) + 1;
          return (
            <div
              className={styles.note}
              data-key={key}
              data-note={child.data}
              ref={(el) => (elementsRef.current![key] = el) as never}
            >
              [{index}]
            </div>
          );
        }

        return node;
      },
    }),
    [elementsRef]
  );

  const skeleton = useMemo(() => {
    return (
      <div>
        {R.range(1, Math.round((globalThis.innerHeight - 140) / 32)).map((i) => (
          <Skeleton key={i} className="mt-4 mb-4" width={`${Math.random() * 20 + 80}%`}></Skeleton>
        ))}
      </div>
    );
  }, []);

  const paragraphContent = parse(state.activeNode?.html ?? '', options);

  if (state.isLoading) {
    return (
      <div className={styles.paragraphView}>
        <div className={styles.viewInner}>{skeleton}</div>
      </div>
    );
  }

  if (state.activeNode?.isEndpoint) {
    return (
      <div className={styles.paragraphView}>
        <div className={styles.viewInner} ref={viewRef}>
          {paragraphContent}
        </div>
        {isNotesVisible && <div className={styles.notes}>{notes}</div>}
      </div>
    );
  }

  const items = state.activeNode?.children;

  return (
    <div className={styles.paragraphView}>
      <div className={styles.viewInner}>
        <h1 className={styles.title}>{state.activeNode?.label}</h1>
        <div className={styles.linkListWrapper}>
          {!!items?.length && <LinkList children={items} markers={['numeric']} />}
        </div>
      </div>
    </div>
  );
}
