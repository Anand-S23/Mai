import os 
import sys
import shutil

x86_PROGRAM_FILES_PATH = R"C:\Program Files (x86)"
START_MENU_PATH = R"C:\ProgramData\Microsoft\Windows\Start Menu"

def move_and_install(program_directory, icon_shortcut):
    program_dest = os.path.join(x86_PROGRAM_FILES_PATH, os.path.basename(program_directory))
    icon_dest = os.path.join(START_MENU_PATH, os.path.basename(icon_shortcut))

    try:
        shutil.copytree(program_directory, program_dest)
        shutil.copy(icon_shortcut, icon_dest)
    except:
        print("Failed copy directory or icon, verify file or directory don't already exist or permission denied (run as administrator)")
        exit(1)
    
    print("Successfully installed!")


def main():
    if len(sys.argv) != 3:
        print("Error: Missing required arguments")
        exit(1)

    program_directory = sys.argv[1]
    icon_shortcut = sys.argv[2]
    move_and_install(program_directory, icon_shortcut)

if __name__ == "__main__":
    main()
