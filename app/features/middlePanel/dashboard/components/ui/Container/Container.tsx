/* eslint-disable react/display-name */
import React, { forwardRef } from "react";
import classNames from "classnames";

import { Remove } from "../Item";

import styles from "./Container.module.scss";

type BaseProps = {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onRemove?(): void;
};

type AsButton = BaseProps & {
  as: 'button';
  onClick: () => void;
  ref?: React.Ref<HTMLButtonElement>;
};

type AsDiv = BaseProps & {
  as?: 'div';
  onClick?: never;
  ref?: React.Ref<HTMLDivElement>;
};

export type Props = AsButton | AsDiv;

export const Container = forwardRef(
  (
    {
      as: Tag = 'div',
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <Tag
        {...props}
        ref={ref as any}
        style={
          {
            ...style,
            "--columns": columns
          } as React.CSSProperties
        }
        className={classNames(
          styles.Container,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow
        )}
        onClick={onClick}
      >
        {label ? (
          <div className={styles.Header}>
            {label}
            {onRemove ? <Remove onClick={onRemove} /> : null}
            {/*
              Removing the drag handle for the semesters for now since there
              is a bug that causes some of the courses to become undefined.
            */}
            {/* {handleProps ? <Handle {...handleProps} /> : null} */}
          </div>
        ) : null}
        {children}
      </Tag>
    );
  }
);
