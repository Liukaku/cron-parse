
alias_name="cronparse"
alias_command="node ~/dev/node/deliver/dist/index.js"

alias_line="alias $alias_name=\"$alias_command\""

# Check if the alias already exists
if grep -q "^$alias_name=" ~/.bashrc; then
    echo "Alias $alias_name already exists in .bashrc"
else
    # Append the alias to .bashrc
    echo "" >> ~/.bashrc
    echo "$alias_line" >> ~/.bashrc
    exec $SHELL
fi
