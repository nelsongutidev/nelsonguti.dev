import { RouteMeta } from '@analogjs/router';
import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  Command,
  NG_COMMANDS,
  SubCommand,
  Option,
} from '../shared/data/angular-data';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TerminalComponent } from '../shared/components/terminal/terminal.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterOptionPipe } from '../shared/data/filter-option.pipe';
import { MarkdownComponent } from '@analogjs/content';
import { MatInputModule } from '@angular/material/input';

export const routeMeta: RouteMeta = {
  title: 'Angular CLI Explorer',
};

@Component({
  selector: 'app-angular-cli',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HeaderComponent,
    TerminalComponent,
    FilterOptionPipe,
    MarkdownComponent,
    MatDialogModule,
    MatInputModule,
  ],
  template: `
    <app-header [title]="'Angular CLI Explorer'" />
    <h4 class="lg:px-24 px-6 text-xl my-6">I need a command that:</h4>
    <div class="lg:px-24 px-6 flex flex-col gap-x-4">
      <div class="w-full flex gap-x-2">
        <mat-form-field class="w-full" appearance="fill">
          <mat-label>Command</mat-label>
          <mat-select [formControl]="commandCtrl">
            @for (command of commands; track command) {
            <mat-option [value]="command">
              {{ command.shortDescription }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        @if (commandCtrl.value?.longDescription) {
        <button
          class="mb-4 md:block hidden"
          type="button"
          (click)="openDescriptionDialog()"
        >
          <mat-icon>info</mat-icon>
        </button>
        }
      </div>

      @if ( commandCtrl.value?.command && commandCtrl.value?.arguments; as
      argument ) {
      <mat-form-field class="w-full" appearance="fill">
        <mat-label>{{ argument.label }}</mat-label>
        <input
          matInput
          [placeholder]="argument?.placeholder"
          [formControl]="commandNameCtrl"
        />
      </mat-form-field>
      } @if (commandCtrl.value?.subcommands?.length > 0) {

      <mat-form-field class="w-full" appearance="fill">
        <mat-label>Sub-commands</mat-label>
        <mat-select [formControl]="subCommandCtrl">
          @for (subCommand of commandCtrl.value?.subcommands; track subCommand)
          {
          <mat-option [value]="subCommand">
            {{ subCommand.shortDescription }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>

      <ng-container *ngIf="subCommand$ | async"></ng-container>

      @if ( subCommandCtrl.value?.command && subCommandCtrl.value?.arguments; as
      argument ) {
      <mat-form-field class="w-full" appearance="fill">
        <mat-label>{{ argument.label }}</mat-label>
        <input
          matInput
          [placeholder]="argument?.placeholder"
          [formControl]="commandNameCtrl"
        />
      </mat-form-field>
      } @if ( subCommandCtrl?.value?.parentCommand === commandCtrl?.value?.name
      && subCommandCtrl?.value?.options?.length > 0 ) {
      <mat-form-field class="w-full" appearance="fill">
        <mat-label>Subcommand Options</mat-label>
        <mat-select [formControl]="subcommandOptionCtrl" multiple>
          @for ( option of subCommandCtrl?.value.options | filterOption ; track
          option) {
          <mat-option [value]="option">
            {{ option.description }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      } } @else { @if (commandCtrl.value?.options?.length > 0) {
      <mat-form-field class="w-full" appearance="fill">
        <mat-label>Options</mat-label>
        <mat-select [formControl]="optionCtrl" multiple>
          @for (option of commandCtrl?.value?.options | filterOption; track
          option) {
          <mat-option [value]="option">
            {{ option.description }}
          </mat-option>
          }
        </mat-select>
      </mat-form-field>
      } }

      <ng-template #commandOptions>
        @if (commandCtrl.value?.options?.length > 0) {
        <mat-form-field class="w-full" appearance="fill">
          <mat-label>Options</mat-label>
          <mat-select [formControl]="optionCtrl" multiple>
            @for (option of commandCtrl?.value?.options | filterOption; track
            option) {
            <mat-option [value]="option">
              {{ option.description }}
            </mat-option>
            }
          </mat-select>
        </mat-form-field>
        }
      </ng-template>
    </div>

    <section class="flex flex-col items-center my-4">
      <div class="w-full max-w-3xl px-4">
        <app-terminal
          [command]="
            ((command$ | async) || '') + ((commandOptions$ | async) || '')
          "
        ></app-terminal>
      </div>
    </section>

    <ng-template #descriptionDialogTpl let-data>
      <div class="flex justify-center p-12">
        <div
          class="block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700 w-full"
        >
          <div class="flex justify-between">
            <h1
              class="mb-2 text-4xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
            >
              Description
            </h1>
            <button class="flex" type="button" mat-dialog-close>
              <mat-icon>close</mat-icon>
            </button>
          </div>
          <p
            class="mb-4 text-base text-neutral-600 dark:text-neutral-200 w-full"
          >
            <analog-markdown
              class="markdown description-dialog"
              [content]="data.description"
            >
            </analog-markdown>
          </p>
        </div>
      </div>
    </ng-template>
  `,
})
export default class AngularCliExplorerComponent {
  @ViewChild('descriptionDialogTpl', { static: false })
  descriptionDialogTpl?: any;

  constructor(public dialog: MatDialog) {}

  commandCtrl = new FormControl();
  optionCtrl = new FormControl();
  subCommandCtrl = new FormControl();
  subcommandOptionCtrl = new FormControl();
  commandNameCtrl = new FormControl();
  commands = NG_COMMANDS;

  commandOptions$: Observable<string> = combineLatest(
    this.commandCtrl.valueChanges.pipe(startWith(null)),
    this.subCommandCtrl.valueChanges.pipe(startWith(null)),
    this.optionCtrl.valueChanges.pipe(startWith(null)),
    this.subcommandOptionCtrl.valueChanges.pipe(startWith(null)),
    this.commandNameCtrl.valueChanges.pipe(startWith(null))
  ).pipe(
    map(
      ([command, subCommand, option, subcommandOption, commandName]: [
        Command,
        SubCommand,
        Option[],
        Option[],
        string
      ]) => {
        const selectecSubCommand =
          subCommand?.parentCommand === command?.name ? subCommand : null;

        const selectedOption =
          option?.[0]?.parentCommand === command?.name
            ? option?.map(({ name }) => `--${name}`).join(' ')
            : null;

        const selectedSubcommandOption =
          subcommandOption?.[0].parentCommand === selectecSubCommand?.name
            ? subcommandOption?.map(({ name }: any) => `--${name}`).join(' ')
            : null;

        const selectedOptions =
          (command?.subcommands || []).length > 0
            ? selectedSubcommandOption
            : selectedOption;

        return ` ${subCommand?.command || ''} ${commandName || ''} ${
          selectedOptions || ''
        }`;
      }
    )
  );

  command$ = this.commandCtrl.valueChanges.pipe(
    map((command) => {
      this.commandNameCtrl.reset();
      this.subCommandCtrl.reset();
      this.optionCtrl.reset();
      this.subcommandOptionCtrl.reset();

      return command?.command || '';
    })
  );

  subCommand$ = this.subCommandCtrl.valueChanges.pipe(
    map(() => {
      this.commandNameCtrl.reset();
      this.subcommandOptionCtrl.reset();
    })
  );

  openDescriptionDialog() {
    const dialogRef = this.dialog.open(this.descriptionDialogTpl, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: { description: this.commandCtrl.value.longDescription },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }
}
